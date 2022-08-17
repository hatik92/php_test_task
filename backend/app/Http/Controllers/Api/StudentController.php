<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Book;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Resources\Json\AnonymousResourceCollection|Response
     */
    public function index(Request $request)
    {
        if (!$request->bookId) {
            return StudentResource::collection(Student::all());
        } else {
            if (!Book::where('id', $request->bookId)->first()) {
                return response('Wrong data!', Response::HTTP_BAD_REQUEST);
            } else {
                return Student::whereNotIn('id',
                    DB::table('book_student')
                    ->select('student_id')
                    ->where('book_id', $request->bookId))
                    ->get();
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = null)
    {
        if (!$id) {
            $id = Auth::guard('student')->user()->getAuthIdentifier();
        }

        $books = Book::select('books.*', 'book_student.return_date')
            ->join('book_student','books.id','=','book_student.book_id')
            ->where('student_id','=',$id)
            ->get();
        $student = Student::findOrFail($id);
        $student['books'] = $books;

        return $student;
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
}
