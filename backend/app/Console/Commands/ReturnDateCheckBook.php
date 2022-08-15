<?php

namespace App\Console\Commands;

use App\Mail\Subscribe;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Console\Command;
//use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReturnDateCheckBook extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:bookDate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $students = Student::select('students.username', 'students.first_name', 'book_student.book_id')
            ->join('book_student','students.id','=','book_student.student_id')
            ->where('return_date','=',Carbon::now()->addDay()->format("Y-m-d"))
            ->get();
        foreach ($students as $student) {
            Mail::to($student->username)
            ->send(new Subscribe($student));
            $this->info($student);
        }
    }
}
