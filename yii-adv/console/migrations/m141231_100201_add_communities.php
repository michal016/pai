<?php

use yii\db\Schema;
use yii\db\Migration;

class m141231_100201_add_communities extends Migration
{
    public function safeUp()
    {
        $this->insert('community', array(
            'name' => 'm. Katowice',
            'district_id' => '3'
        ));
        $this->insert('community', array(
            'name' => 'Stryszawa',
            'district_id' => '1'
        ));
        $this->insert('community', array(
            'name' => 'Sucha Beskidzka',
            'district_id' => '1'
        ));
        $this->insert('community', array(
            'name' => 'Ślemień',
            'district_id' => '2'
        ));
        $this->insert('community', array(
            'name' => 'Gilowice',
            'district_id' => '2'
        ));
        return true;
    }

    public function safeDown()
    {
        $this->delete('community');
        return true;
    }
}
