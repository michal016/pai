<?php

namespace frontend\controllers;

use Yii;
use app\models\Voivodship;
use yii\filters\AccessControl;

class DefectController extends \yii\web\Controller
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
                        'actions' => ['index', 'read'],
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

//        $voivodships = Voivodship::findBySql('select * from voivodship')->all();
//        $data = array();
//
//        foreach ($voivodships as $voivodship) {
//            $data[] = array(
//                'id' => $voivodship->getAttribute('id'),
//                'name' => $voivodship->getAttribute('name')
//            );
//        }
//
//        $response = array(
//            'success' => true,
//            'data' => $data
//        );
//
//        return json_encode($response);
    }

}

