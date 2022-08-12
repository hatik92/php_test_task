<?php

namespace App\Console\Commands;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Console\Command;
//use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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
//        $date = DB::table('book_student')
////            ->whereDate('return_date', '<=', date("Y-m-d"))
//            ->whereDate('return_date', '=', Carbon::now()->addDay()->format("Y-m-d"))
//            ->get();
        $student = Student::select('students.username')
            ->join('book_student','students.id','=','book_student.student_id')
            ->where('return_date','=',Carbon::now()->addDay()->format("Y-m-d"))
            ->get();
        $this->info($student);
    }
}
