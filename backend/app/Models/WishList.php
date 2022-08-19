<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'book_id'
    ];
    /**
     * Get the books for the wishlist.
     */
    public function book(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Book::class, 'id', 'book_id');
    }

    /**
     * Get the books for the wishlist.
     */
    public function student(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Student::class, 'id', 'student_id');
    }
}
