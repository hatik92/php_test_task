<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\WishList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishListController extends Controller
{
    public function index($id = null)
    {
//        if(Auth::guard('student')->check()){
//            dd(Auth::guard('student')->user()->name);
//        }
//        elseif(Auth::guard('sanctum')->check()){
//            dd(Auth::guard('sanctum')->user()->name);
//        }
        if(Auth::guard('student')->check()){
            return Book::select('books.*')
                ->join('wish_lists','books.id','=','wish_lists.book_id')
                ->where('wish_lists.student_id', '=', Auth::guard('student')->user()->id)
                ->get();;
        }
        elseif(Auth::guard('sanctum')->check()){
            dd(Auth::guard('sanctum')->user()->name);
        }
    }
    public function addToWishList(Request $request)
    {
        WishList::create([
            'student_id'    => Auth::guard('student')->user()->id,
            'book_id'       => $request->book_id
        ]);
    }
}
