<?php

namespace App\Console\Commands\Marketing;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class PruneSharePreviews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketing:prune-previews {--days=30 : The number of days after which previews are pruned}';

    /**
     * The description of the console command.
     *
     * @var string
     */
    protected $description = 'Clean up old marketing share preview images to save storage.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = (int) $this->option('days');
        $directory = storage_path('app/share-previews');
        
        if (!is_dir($directory)) {
            $this->info('No share previews directory found.');
            return 0;
        }

        $files = File::files($directory);
        $count = 0;
        $now = time();
        $cutoffSeconds = $days * 86400;

        foreach ($files as $file) {
            $mtime = filemtime($file->getPathname());
            if (($now - $mtime) > $cutoffSeconds) {
                File::delete($file->getPathname());
                $count++;
            }
        }

        $this->info("Pruned {$count} old preview images (older than {$days} days).");

        return 0;
    }
}
