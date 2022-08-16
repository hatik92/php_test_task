<?php

namespace App\Http\Controllers\Api\Students;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        if ($request->search && $request->search != '') {
            $search = $request->search;
            return BookResource::collection(Book::where('title', 'LIKE', "%{$search}%")
                ->orWhere('author', 'LIKE', "%{$search}%")->orderByDesc('id')->paginate(20));
        }
        return BookResource::collection(Book::orderByDesc('id')->paginate(20));
    }
}
