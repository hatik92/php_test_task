<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence($nbWords = 2),
            'author' => $this->faker->firstName,
            'count' => $this->faker->numberBetween($min = 0, $max = 25),
            'year' => $this->faker->numberBetween($min = 1965, $max = 2005) 
        ];
    }
}
