<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = \App\Models\Branch::all();
        foreach ($branches as $branch) {
            \App\Models\DeliveryZone::updateOrCreate(
                ['branch_id' => $branch->id, 'code' => 'ZONE-A'],
                [
                    'name' => [
                        'ar' => 'المنطقة الرئيسية',
                        'en' => 'Main Zone'
                    ],
                    'delivery_fee' => 15.00,
                    'min_delivery_time_minutes' => 30,
                    'max_delivery_time_minutes' => 45,
                    'is_active' => true,
                ]
            );
            
            \App\Models\DeliveryZone::updateOrCreate(
                ['branch_id' => $branch->id, 'code' => 'ZONE-B'],
                [
                    'name' => [
                        'ar' => 'المنطقة البعيدة',
                        'en' => 'Extended Zone'
                    ],
                    'delivery_fee' => 35.00,
                    'min_delivery_time_minutes' => 45,
                    'max_delivery_time_minutes' => 60,
                    'is_active' => true,
                ]
            );
        }
    }
}
