<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "defect".
 *
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $create_date
 * @property integer $status
 * @property string $photo
 * @property double $longitude
 * @property double $latitude
 * @property integer $community_id
 *
 * @property Community $community
 */
class Defect extends \yii\db\ActiveRecord
{
    const STATUS_REPORTED = 0;
    const STATUS_RESOLVED = 1;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'defect';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['description'], 'string'],
            [['create_date'], 'safe'],
            [['status', 'community_id'], 'integer'],
            [['longitude', 'latitude'], 'number'],
            [['title'], 'string', 'max' => 100],
            [['photo'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
            'create_date' => 'Create Date',
            'status' => 'Status',
            'photo' => 'Photo',
            'longitude' => 'Longitude',
            'latitude' => 'Latitude',
            'community_id' => 'Community ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCommunity()
    {
        return $this->hasOne(Community::className(), ['id' => 'community_id']);
    }
}
