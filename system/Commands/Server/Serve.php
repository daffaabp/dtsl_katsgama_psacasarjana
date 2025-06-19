<?php

/**
 * This file is part of CodeIgniter 4 framework.
 *
 * (c) CodeIgniter Foundation <admin@codeigniter.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace CodeIgniter\Commands\Server;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

/**
 * Launch the PHP development server
 *
 * Not testable, as it throws phpunit for a loop :-/
 *
 * @codeCoverageIgnore
 */
class Serve extends BaseCommand
{
    /**
     * Group
     *
     * @var string
     */
    protected $group = 'CodeIgniter';

    /**
     * Name
     *
     * @var string
     */
    protected $name = 'serve';

    /**
     * Description
     *
     * @var string
     */
    protected $description = 'Launches the CodeIgniter PHP-Development Server.';

    /**
     * Usage
     *
     * @var string
     */
    protected $usage = 'serve';

    /**
     * Arguments
     *
     * @var array
     */
    protected $arguments = [];

    /**
     * The current port offset.
     *
     * @var int
     */
    protected $portOffset = 0;

    /**
     * The max number of ports to attempt to serve from
     *
     * @var int
     */
    protected $tries = 10;

    /**
     * Options
     *
     * @var array
     */
    protected $options = [
        '--php'  => 'The PHP Binary [default: "PHP_BINARY"]',
        '--host' => 'The HTTP Host [default: "localhost"]',
        '--port' => 'The HTTP Host Port [default: "8080"]',
    ];

    /**
     * Run the server
     */
    public function run(array $params)
    {
        // Gunakan binary PHP dari opsi CLI atau fallback ke PHP bawaan sistem
        $php  = escapeshellarg(CLI::getOption('php') ?? PHP_BINARY);
    
        // Ambil host dan port dari CLI args atau fallback default
        $host = CLI::getOption('host') ?? 'localhost';
        $port = (int) (CLI::getOption('port') ?? 8080) + $this->portOffset;
    
        // Informasi kepada user bahwa server dijalankan
        CLI::write('CodeIgniter development server started on http://' . $host . ':' . $port, 'green');
        CLI::write('Press Control-C to stop.');
    
        // Path ke direktori publik (biasanya public/)
        $docroot = escapeshellarg(FCPATH);
    
        // Path ke file rewrite yang akan bertindak seperti mod_rewrite (index.php routing)
        $rewrite = escapeshellarg(__DIR__ . '/rewrite.php');
    
        // Bangun perintah untuk menjalankan server PHP bawaan
        $command = "{$php} -S {$host}:{$port} -t {$docroot} {$rewrite}";
    
        // Jalankan perintah
        passthru($command, $status);
    
        // Jika gagal dan masih punya percobaan tersisa, coba port berikutnya
        if ($status && $this->portOffset < $this->tries) {
            $this->portOffset++;
            $this->run($params);
        }
    }
}
