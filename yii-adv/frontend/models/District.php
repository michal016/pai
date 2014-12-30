<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "district".
 *
 * @property integer $id
 * @property string $name
 * @property integer $voivodship_id
 *
 * @property Community[] $communities
 * @property Voivodship $voivodship
 */
class District extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'district';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['voivodship_id'], 'integer'],
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
            'voivodship_id' => 'Voivodship ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCommunities()
    {
        return $this->hasMany(Community::className(), ['district_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVoivodship()
    {
        return $this->hasOne(Voivodship::className(), ['id' => 'voivodship_id']);
    }
}
