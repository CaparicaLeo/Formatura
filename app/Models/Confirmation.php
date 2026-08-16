<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Confirmation extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'companions',
    ];

    protected $hidden = [
        'ip_address',
    ];

    protected function casts(): array
    {
        return [
            'companions' => 'array',
            'confirmed_at' => 'datetime',
        ];
    }
}
