<?php

namespace App\Mail;

use App\Models\Book;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Subscribe extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $email;

    public function __construct($student)
    {
        $this->email    = $student->username;
        $this->name     = $student->name;
        $this->bookId   = $student->book_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $book = Book::where('id', $this->bookId)->first();
        $data = [
            'book' => $book,
            'name' => $this->name
        ];
        return $this
            ->subject('Library')
            ->markdown('emails.subscribers')->with('data', $data);
    }
}
