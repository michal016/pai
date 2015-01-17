<?php

namespace frontend\controllers;

use Yii;
use common\models\User;
use app\models\Voivodship;
use yii\filters\AccessControl;
use app\models\Community;
use app\models\District;

class MainController extends \yii\web\Controller
{
    public function beforeAction($action)
    {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index', 'read'],
                'rules' => [
                    [
                        'actions' => ['readVoivodships', 'readDistricts', 'readCommunities', 'register', 'logged', 'login', 'logout'],
                        'allow' => true,
                        'roles' => ['?'],
                    ]
                ]
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ]
        ];
    }

    public function actionReadVoivodships()
    {

        $voivodships = Voivodship::findBySql('select * from voivodship')->all();
        $data = array();

        /** @var Voivodship $voivodship */
        foreach ($voivodships as $voivodship) {
            $data[] = array(
                'id' => $voivodship->getAttribute('id'),
                'name' => $voivodship->getAttribute('name')
            );
        }

        $response = array(
            'success' => true,
            'data' => $data
        );

        return json_encode($response);
    }

    public function actionReadDistricts()
    {

        $districts = District::findBySql('select * from district')->all();
        $data = array();

        /** @var District $district */
        foreach ($districts as $district) {

            $data[] = array(
                'id' => $district->id,
                'name' => $district->name,
                'voivodship_id' => $district->voivodship_id
            );
        }

        $response = array(
            'success' => true,
            'data' => $data
        );

        return json_encode($response);
    }

    public function actionReadCommunities()
    {

        $communities = Community::findBySql('select * from community')->all();
        $data = array();

        /** @var Community $community */
        foreach ($communities as $community) {
            $data[] = array(
                'id' => $community->id,
                'name' => $community->name,
                'district_id' => $community->district_id
            );
        }

        $response = array(
            'success' => true,
            'data' => $data
        );

        return json_encode($response);
    }

    public function actionRegister()
    {
        try {
            $login = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $community = $_POST['community'];
            $district = $_POST['district'];
            $voivodship = $_POST['voivodship'];
            $rememberMe = true;

            /** @var User $user */
            $user = User::findByUsername($login);

            if ($user instanceof User) {
                throw new \RuntimeException('Użytkownik już istnieje');
            }
            /** @var User $user */
            $user = new User();
            $user->username = $login;
            $user->email = $email;
            $user->community_id = $community;
            $user->district_id = $district;
            $user->voivodship_id = $voivodship;
            $user->setPassword($password);
            $user->generateAuthKey();


            if (!$user->save()) {
                throw new \RuntimeException('Nie udało się zapisać użytkownika do bazy danych');
            }

//            if(!Yii::$app->getUser()->login($user)) {
//                throw new \RuntimeException('Użytkownik utworzony. Nie udało się zalogować.');
//            }


            if (!Yii::$app->user->login($user, $rememberMe ? 3600 * 24 * 30 : 0)) {
                throw new \RuntimeException('Nie udało się zalogować utworzonego użytkownika.');
            }

            $success = true;
            $message = 'Rejestracja przebiegła poprawnie';

            $data = array(
                'username' => $user->username,
                'communityId' => $user->community_id,
                'districtId' => $user->district_id,
                'voivodshipId' => $user->voivodship_id,
                'logged' => true
            );


        } catch (\RuntimeException $e) {

            $success = false;
            $message = $e->getMessage();
            $data = '';
        }

        $response = array(
            'success' => $success,
            'message' => $message,
            'data' => $data
        );

        return json_encode($response);
    }

    public function actionLogin()
    {
        try {
            $login = $_POST['username'];
            $password = $_POST['password'];
            $rememberMe = $_POST['rememberMe'] == 'on';

            /** @var User $user */
            $user = User::findByUsername($login);

            if (!$user instanceof User) {
                throw new \RuntimeException('User not found');
            }

            $data = array();

            if (!$user->validatePassword($password)) {
                throw new \RuntimeException('Password not valid');
            }

            if (Yii::$app->user->login($user, $rememberMe ? 3600 * 24 * 30 : 0)) {
                $success = true;
                $message = 'Rejestracja przebiegła poprawnie';

                $data = array(
                    'username' => $user->username,
                    'communityId' => $user->community_id,
                    'districtId' => $user->district_id,
                    'voivodshipId' => $user->voivodship_id,
                    'logged' => true
                );

            } else {
                throw new \RuntimeException('Wystąpił błąd podczas zapisu do bazy danych');
            }

            $response = array(
                'success' => true,
                'message' => $message,
                'data' => $data
            );

        } catch (\RuntimeException $e) {

            $response = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return json_encode($response);
    }

    public function actionLogged()
    {

        try {
            if (!Yii::$app->user->isGuest) {

                $user = Yii::$app->getUser()->identity;

                if (!$user instanceof User) {
                    throw new \RuntimeException('User not found');
                }

                $data = array(
                    'username' => $user->username,
                    'communityId' => $user->community_id,
                    'districtId' => $user->district_id,
                    'voivodshipId' => $user->voivodship_id,
                    'logged' => true
                );

                $response = array(
                    'success' => true,
                    'message' => 'Poprawnie odczytano dane zalogowanego użytkownika',
                    'data' => $data
                );
            } else {

                $response = array(
                    'success' => true,
                    'message' => 'Użytkownik nie jest zalogowany',
                    'data' => array(
                        'logged' => false
                    )
                );
            }


        } catch (\RuntimeException $e) {

            $response = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return json_encode($response);
    }

    public function actionLogout() {
        Yii::$app->user->logout();
        if (Yii::$app->user->isGuest) {
            $response = [
                'success' => true,
                'message' => 'Wylogowano pomyślnie'
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Nie udało się wylogować'
            ];
        }

        return json_encode($response);
    }
}