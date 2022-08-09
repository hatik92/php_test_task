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
            $url = 'https://www.gutenberg.org/';
            $page = $client->request('GET', $url);
            $companies = $page->filter('div[class="lib latest no-select"] > a')->each(function ($node) {
                $book['title'] = $node->attr('title');
                $book['author'] = $node->attr('authors');
                $book['csacsc'] = $node->attr('authors');
                $book['img'] = $node->filter('.cover_img > img')->attr('src');
                return $book;
            });
            $this->output->progressStart(count($companies));
            $faker = Faker::create();
            foreach ($companies as $item) {
                Book::create([
                    'title'     => $item['title'],
                    'author'    => $item['author'],
                    'img'       => $url.$item['img'],
                    'count'     => $faker->numberBetween($min = 0, $max = 25),
                    'year'      => $faker->numberBetween($min = 1800, $max = 2005),
                ]);
            }
            for ($i = 0; $i < count($companies); $i++) {
                sleep(1);
                $this->output->progressAdvance();
            }

            $this->output->progressFinish();
            $this->info("Books added successfully!");
        } catch (\Throwable $err) {
            $this->error($err);
        }
    }
}
