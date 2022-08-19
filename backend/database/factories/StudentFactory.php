<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email'             => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => '$2a$12$f0fe3HuR7GTZTieKu/Dcw.3efVQJ8Wot9gsQ89PTAe9i/UyOrsGwi', // 123456789
            'remember_token'    => Str::random(10),
            'username'          => $this->faker->userName,
            'name'        => $this->faker->firstName,
            'surname'           => $this->faker->lastName,
            'facultet'          => $this->faker->jobTitle,
            'image'             => $this->faker->imageUrl(100, 100, 'users'),
        ];
    }
}
