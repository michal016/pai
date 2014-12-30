<?php

namespace frontend\controllers;

use Yii;
use app\models\Voivodship;
use yii\filters\AccessControl;
use app\models\Community;
use app\models\District;

class MainController extends \yii\web\Controller
{
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
                        'actions' => ['readVoivodships', 'readDistricts', 'readCommunities'],
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

    public function actionReadVoivodships() {

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

    public function actionReadDistricts() {

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

    public function actionReadCommunities() {

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
}