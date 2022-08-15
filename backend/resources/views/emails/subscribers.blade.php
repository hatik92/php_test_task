@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => 'http://localhost:3000/books'])
            # Library
        @endcomponent
    @endslot

    {{-- Body --}}
    Dear {{ $data['name'] }}, you are about to expire the book '{{$data['book']->title}}'. Please return the book within 24 hours.

    {{-- Subcopy --}}
{{--    @slot('subcopy')--}}
{{--        @component('mail::subcopy')--}}
{{--            <!-- subcopy here -->--}}
{{--        @endcomponent--}}
{{--    @endslot--}}


    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            Sincerely, Library Administration
        @endcomponent
    @endslot
@endcomponent
