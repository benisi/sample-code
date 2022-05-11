<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use App\Services\Dto\PostDto;
use App\Services\ExternalBlogService;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Mockery\MockInterface;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_pull_post_from_external_blog()
    {
        $this->seed(AdminUserSeeder::class);
        $postDto = new PostDto([
            "title" => "Labore sed accusamus voluptates.",
            "description" => "Aut nesciunt consequatur et dolore quas iusto eos. Magnam qui laborum at alias nobis deleniti nobis est. Impedit velit dicta. Nesciunt quia soluta non omnis itaque inventore sed doloremque.",
            "publication_date" => "2022-05-09 21:29:38"
        ]);

        $this->mock(ExternalBlogService::class, function (MockInterface $mock) use ($postDto) {
            $mock->shouldReceive('getLatestPost')
                ->once()
                ->andReturn([$postDto]);
        });

        $this->artisan('pull:post')->assertExitCode(0);

        $this->assertDatabaseHas('posts', [
            'title' => $postDto->title,
            'description' => $postDto->description,
            'publication_date' => $postDto->publication_date,
            'user_id' => User::admin()->id
        ]);

        $this->assertDatabaseCount('posts', 1);
    }

    public function test_can_view_all_post()
    {
        $user = User::factory()->create();
        Post::factory()->count(20)->for($user)->create(); 
        $this->get('/')
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Post/AllPost')
                ->where('posts.per_page', 10)
                ->where('posts.total', 20)
                ->has('posts.data', 10)
                ->where('posts.data.0.user', $user)
            );
    }
}
