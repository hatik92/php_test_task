<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookResource::collection(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBookRequest $request)
    {
//        dd($request->validated());

//        $addNewBook = Book::create($request->validated());
        if ($request->validated())
        {
            $student = Student::find($request->student_id);
            $book = Book::find($request->book_id);
            $book->students()->attach($student, ['return_date' => Carbon::now()->addSeconds(864000)->format("y-m-d")]);
        }

        return new BookResource($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

//        $book = Book::findOrFail($id);
//        dd($book->students2);
        return new BookResource(Book::with('students')->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function detachBook(StoreBookRequest $request)
    {
        if ($request->validated())
        {
            $student = Student::find($request->student_id);
            $book = Book::find($request->book_id);
            $book->students()->detach($student);
        }

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
