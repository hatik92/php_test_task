<?php

namespace App\Console\Commands;

use App\Http\Responses\ApiResponse;
use App\Models\Book;
use Faker\Factory as Faker;
use Goutte\Client;
use Illuminate\Console\Command;

class GetBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:books';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add books through Artisan';

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
        try {
            $client = new Client();
            $url = 'https://manybooks.net/search-book?sticky=1&page=8';
            $page = $client->request('GET', $url);

            $books = $page->filter('.book-hover')->each(function ($node) {
                $book['title'] = $node->filter('.book-hover-content')->first()->filter('a')->first()->text();
                $book['author'] = $node->filter('span a')->text();
                $book['img'] = $node->filter('.image img')->attr('src');
                return $book;
            });

//            $this->output->progressStart(count($books));
            $faker = Faker::create();
            foreach ($books as $item) {
                Book::updateOrCreate([
                    'title'     => $item['title'],
                    'author'    => $item['author']
                ],[
                    'img'       => 'https://manybooks.net'.$item['img'],
                    'count'     => $faker->numberBetween($min = 0, $max = 25),
                    'year'      => $faker->numberBetween($min = 1800, $max = 2005)
                ]);
            }
//            for ($i = 0; $i < count($books); $i++) {
//                sleep(1);
//                $this->output->progressAdvance();
//            }
//
//            $this->output->progressFinish();
            $this->info("Books added successfully!");
        } catch (\Throwable $err) {
            $this->error($err);
        }
    }
}
