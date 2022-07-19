<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'year',
        'count'
    ];
//    protected $guarded = ['is_admin'];

    protected $hidden = ['pivot'];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }
}
