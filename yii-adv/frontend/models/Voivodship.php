<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "voivodship".
 *
 * @property integer $id
 * @property string $name
 *
 * @property District[] $districts
 */
class Voivodship extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'voivodship';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
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
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDistricts()
    {
        return $this->hasMany(District::className(), ['voivodship_id' => 'id']);
    }
}
