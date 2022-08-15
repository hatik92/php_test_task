<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssaginBookRequest;
use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookResource;
use App\Http\Responses\ApiResponse;
use App\Models\Book;
use App\Models\Student;
use Carbon\Carbon;
use Goutte\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */


    public function store(StoreBookRequest $request)
    {
        try {
            if (!Auth::user()->admin) {
                Auth::logout();
                return ApiResponse::createValidationResponse([
                    'response' => ['Is not admin!']
                ]);
            }
            if (!$request->validated()) {
                return ApiResponse::createValidationResponse([
                    'response' => ['Incorrect data has been entered!']
                ]);
            }
//            return gettype($request->title);
            $title = $request->title;
            if (Book::where('title', $title)->first()){
                return ApiResponse::__createBadResponse('This book is already in the library! You can change it under All books->Edit!');
            }

            Book::create($request->validated());
//            $book = new Book();
//
//            $book->title = $request->input('title');
//            $book->author = $request->input('author');
//            $book->count = $request->input('count');
//            $book->year=$request->input('year');
//            $book->save();

            return ApiResponse::create([
                'success' => true
            ]);

        } catch (\Throwable $err) {
            return ApiResponse::createServerError($err);
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
//        dd(Book::with('students')->findOrFail($id)->toSql());
        return Book::with('students')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreBookRequest $request, Book $book)
    {
        try {
            if (!Auth::user()->admin) {
                Auth::logout();
                return ApiResponse::createValidationResponse([
                    'response' => ['Is not admin!']
                ]);
            }
            if (!$request->validated()) {
                return ApiResponse::createValidationResponse([
                    'response' => ['Incorrect data has been entered!']
                ]);
            }
            $book->update($request->validated());
            return ApiResponse::create([
                'success' => true
            ]);

        } catch (\Throwable $err) {
            return ApiResponse::createServerError($err);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        try {
            $book->delete();
            return ApiResponse::create([
                'success' => true
            ]);
        } catch (\Throwable $err) {
            return ApiResponse::createServerError($err);
        }
    }


    public function assignBook(AssaginBookRequest $request)
    {
        try {
            if (!$request->validated()) {
                return ApiResponse::createValidationResponse([
                    'response' => ['Incorrect data has been entered!']
                ]);
            }
            $book_student = DB::table('book_student')
                ->where([
                    ['book_id', '=', $request->book_id],
                    ['student_id', '=', $request->student_id]
                ])
                ->first();

            if ($book_student) {
                return ApiResponse::__createBadResponse('You can\'t take one book more than once!');
            }
            $student = Student::find($request->student_id);
            $book = Book::find($request->book_id);
            if (!$student || !$book) {
                return ApiResponse::__createBadResponse('Incorrect data has been entered!');
            }
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
            if ($book->count == $availableBook || $book->count == 0) {
                return ApiResponse::createNoPermissionResponse(['This book is not available']);
            }
            $book->students()->attach($student, ['return_date' => Carbon::now()->addSeconds(config('constants.ONE_DAY_IN_SECONDS') * 10)->format("y-m-d")]);
            return ApiResponse::create([
                'success' => true
            ]);

        } catch (\Throwable $err) {
            return ApiResponse::createServerError($err);
        }
    }

    public function detachBook(AssaginBookRequest $request)
    {
        try {
            if (!$request->validated()) {
                return ApiResponse::createValidationResponse([
                    'response' => ['Incorrect data has been entered!']
                ]);
            }
            $student = Student::find($request->student_id);
            $book = Book::find($request->book_id);
            $book->students()->detach($student);
            return ApiResponse::create([
                'success' => true
            ]);
        } catch (\Throwable $err) {
            return ApiResponse::createServerError($err);
        }

    }
}
