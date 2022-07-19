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
use Illuminate\Support\Facades\DB;

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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBookRequest $request)
    {

        if ($request->validated()) {

//            $book_student = DB::select("SELECT * FROM book_student WHERE book_id = '$request->book_id' AND student_id = '$request->student_id'");
            $book_student = DB::table('book_student')
                ->where([
                    ['book_id', '=',  $request->book_id],
                    ['student_id', '=',  $request->student_id]
                ])
                ->first();

            if (!$book_student) {

                $student = Student::find($request->student_id);
                $book = Book::find($request->book_id);
                if ($student && $book) {
                    $groupByBook = DB::table('book_student')
                        ->selectRaw('COUNT(*) AS available, book_id')
                        ->where('book_id', $request->book_id)
                        ->groupBy('book_id');

                    $available = DB::table('books')
                        ->leftJoinSub($groupByBook, 'book_student', function ($join) {
                            $join->on('books.id', '=', 'book_student.book_id');
                        })->where('book_id', $request->book_id)->first();
                    $availableBook = 0;
                    if ($available) {
                        $availableBook = $available->available;
                    }
                    if ($book->count > $availableBook) {
                        $book->students()->attach($student, ['return_date' => Carbon::now()->addSeconds(config('constants.ONE_DAY_IN_SECONDS') * 10)->format("y-m-d")]);
                    } else {
                        return response('This book is not available', Response::HTTP_BAD_REQUEST);
                    }
                } else {
                    return response('Incorrect data has been entered!', Response::HTTP_BAD_REQUEST);
                }
                return new BookResource($book);
            } else {
                return response('You can\'t take one book more than once!', Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response('Incorrect data has been entered!', Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new BookResource(Book::with('students')->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function detachBook(StoreBookRequest $request)
    {
        if ($request->validated()) {
            $student = Student::find($request->student_id);
            $book = Book::find($request->book_id);
            $book->students()->detach($student);
        }

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
