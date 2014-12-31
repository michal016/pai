<?php

namespace frontend\controllers;

use app\models\Defect;
use Yii;
use app\models\Voivodship;
use yii\filters\AccessControl;

class DefectController extends \yii\web\Controller
{
    public function beforeAction($action) {
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
                        'actions' => ['index', 'read', 'create', 'update', 'remove'],
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

    public function actionIndex()
    {
        $this->redirect('../../0');
    }

    public function actionRead() {

        $defects = Defect::findBySql('select * from defect')->all();
        $data = array();

        /** @var Defect $defect */
        foreach ($defects as $defect) {
            $data[] = array(
                'id' => $defect->id,
                'title' => $defect->title,
                'description' => $defect->description,
                'create_date' => $defect->create_date,
                'status' => $defect->status,
                'photo' => $defect->photo,
                'longitude' => $defect->longitude,
                'latitude' => $defect->latitude,
                'community_id' => $defect->community_id,
                'district_id' => $defect->district_id,
                'voivodship_id' => $defect->voivodship_id
            );
        }

        $response = array(
            'success' => true,
            'data' => $data
        );

        return json_encode($response);
    }


    public function actionCreate() {

        $voivodshipId = $_POST['voivodship'];
        $districtId = $_POST['district'];
        $communityId = $_POST['community'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        /** @var Defect $defect */
        $defect = new Defect();
        $defect->title = $title;
        $defect->description = $description;
        $defect->status = Defect::STATUS_REPORTED;
        $defect->community_id = $communityId;
        $defect->district_id = $districtId;
        $defect->voivodship_id = $voivodshipId;

        // todo photo

        // todo longitude latitude

        if ($defect->save()) {
            $success = true;
        } else {
            $success = false;
        }

        $response = array(
            'success' => $success
        );

        return json_encode($response);
    }
}

