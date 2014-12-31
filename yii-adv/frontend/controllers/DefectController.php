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

        $target_dir = "upload/photos/";
        $target_file = $target_dir . basename($_FILES["photo"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if ($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
// Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
// Check file size
        if ($_FILES["photo"]["size"] > 1000000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
// Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
// Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
                echo "The file " . basename($_FILES["photo"]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }


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

