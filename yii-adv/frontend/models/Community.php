<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "community".
 *
 * @property integer $id
 * @property string $name
 * @property integer $district_id
 *
 * @property District $district
 * @property Defect[] $defects
 */
class Community extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'community';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['district_id'], 'integer'],
            [['name'], 'string', 'max' => 30]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'district_id' => 'District ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDistrict()
    {
        return $this->hasOne(District::className(), ['id' => 'district_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefects()
    {
        return $this->hasMany(Defect::className(), ['community_id' => 'id']);
    }
}
