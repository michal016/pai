<?php

namespace frontend\controllers;

use app\models\Defect;
use Yii;
use app\models\Voivodship;
use yii\filters\AccessControl;

class DefectController extends \yii\web\Controller
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

    public function actionRead()
    {

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


    public function actionCreate()
    {
        $msg = "Usterka została poprawnie zapisana";
        $voivodshipId = $_POST['voivodship'];
        $districtId = $_POST['district'];
        $communityId = $_POST['community'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $longitude = $_POST['longitude'];
        $latitude = $_POST['latitude'];

        /** @var Defect $defect */
        $defect = new Defect();
        $defect->title = $title;
        $defect->description = $description;
        $defect->status = Defect::STATUS_REPORTED;
        $defect->community_id = $communityId;
        $defect->district_id = $districtId;
        $defect->voivodship_id = $voivodshipId;
        $defect->latitude = $latitude;
        $defect->longitude = $longitude;


        // todo photo - change filename to random string

        if ($_FILES["photo"]["name"] != '') {

            $target_dir = "upload/photos/";
            $uploadOk = 1;
            $imageFileType = pathinfo(basename($_FILES["photo"]["name"], PATHINFO_EXTENSION))['extension'];
            $filename = $this->generateRandomString() . '.' . $imageFileType;
            $target_file = $target_dir . $filename;
            $msg = 'Przepraszamy, podczas wysyłania pliku wystąpił błąd.';

            $check = getimagesize($_FILES["photo"]["tmp_name"]);
            if ($check !== false) {
                $msg = "Plik jest obrazem - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                $msg = "Plik nie jest obrazem.";
                $uploadOk = 0;
            }

//        // Check if file already exists
//        if (file_exists($target_file)) {
//            $msg = "Sorry, file already exists.";
//            $uploadOk = 0;
//        }

            // Check file size
            if ($_FILES["photo"]["size"] > 5000000) {
                $msg = "Plik jest zbyt duży.";
                $uploadOk = 0;
            }

            // Allow certain file formats
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                && $imageFileType != "gif"
            ) {
                $msg = "Plik powinien mieć rozszerzenie JPG, JPEG, PNG lub GIF.";
                $uploadOk = 0;
            }

            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $msg = "Przepraszamy, podczas wysyłania pliku wystąpił błąd.";

                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
                    $msg = "Plik " . basename($_FILES["photo"]["name"]) . " został poprawnie zapisany.";
                    $defect->photo = $filename;
                } else {
                    $msg = "Przepraszamy, podczas wysyłania pliku wystąpił błąd.";
                }
            }
        }

        if ($defect->save()) {
            $success = true;
        } else {
            $success = false;
        }

        $response = array(
            'success' => $success,
            'message' => $msg
        );

        return json_encode($response);
    }

    private function generateRandomString() {
        return substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 3).substr(md5(time()),0,10);
    }
}

