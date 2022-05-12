<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use App\Services\Dto\PostDto;
use App\Services\ExternalBlogService;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
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
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/AllPost')
                    ->where('posts.per_page', 10)
                    ->where('posts.total', 20)
                    ->has('posts.data', 10)
                    ->where('posts.data.0.user', $user)
            );
    }

    public function test_can_view_all_post_sorted_by_oldest()
    {
        $oldestPost = Post::factory()->forUser()->create([
            'publication_date' => now()->subHours(5)->toDateTimeString()
        ]);
        Post::factory()->count(10)->forUser()->create();
        $this->get('/?sort_publication_date=oldest')
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/AllPost')
                    ->where('posts.data.0', $oldestPost->load('user'))
            );
    }

    public function test_can_view_all_post_sorted_by_latest()
    {
        $latestPost = Post::factory()->forUser()->create();
        Post::factory()->count(10)->forUser()->create(
            [
                'publication_date' => now()->subHours(5)->toDateTimeString()
            ]
        );
        $this->get('/?sort_publication_date=latest')
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/AllPost')
                    ->where('posts.data.0', $latestPost->load('user'))
            );
    }

    public function test_can_view_only_user_post_on_the_dashboard()
    {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create();
        Post::factory()->count(3)->for($user)->create();
        Post::factory()->count(3)->for($anotherUser)->create();
        $this->actingAs($user)->get('/dashboard')
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/AllPost')
                    ->has('posts.data', 3)
                    ->where(
                        'posts.data', function (Collection $posts) use ($user) {
                            $containOnlyUserPost = true;
                            $posts->each(function($post) use (&$containOnlyUserPost, $user){
                                if($post['user']['id'] !== $user->id){
                                    $containOnlyUserPost = false;
                                }
                            });

                            return $containOnlyUserPost;
                        }
                    )
            );
    }
}
