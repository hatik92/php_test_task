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
        'img',
        'year',
        'count'
    ];
//    protected $guarded = ['is_admin'];

    protected $hidden = ['pivot'];

    public function students()
    {
//        dd($this->belongsToMany(Student::class)->toSql());
        return $this->belongsToMany(Student::class)
            ->select(['students.id', 'students.username', 'students.first_name', 'students.surname', 'book_student.return_date']);
    }
}
