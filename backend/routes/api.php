<?php

use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\SubscriberController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [LoginController::class, 'login']);
Route::post('loginStudent', [LoginController::class, 'loginStudent']);
Route::post('loginDashboard', [LoginController::class, 'loginAdmin']);
Route::post('logout', [LoginController::class, 'logout']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/student', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResources([
        'books' => BookController::class,
        'students' => StudentController::class
    ]);
    Route::post('/books/detach', [BookController::class, 'detachBook']);
    Route::post('/books/assign', [BookController::class, 'assignBook']);
});

//Route::get('scraper', [BookController::class, 'libery']);


//Route::post('/subscribe', [SubscriberController::class, 'subscribe']);
