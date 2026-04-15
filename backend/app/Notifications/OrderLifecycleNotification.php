<?php

namespace App\Notifications;

use App\Services\Settings\SettingService;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderLifecycleNotification extends Notification
{
    use Queueable;

    /**
     * @param  array<string, mixed>  $context
     */
    public function __construct(
        protected string $event,
        protected string $title,
        protected string $message,
        protected array $context = [],
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = ['database'];
        $settings = app(SettingService::class);
        $emailEnabled = $settings->featureEnabled('email_notifications_enabled')
            && (bool) $settings->getValue('notifications', 'email_enabled', false);
        $broadcastEnabled = $settings->featureEnabled('broadcast_notifications_enabled')
            && (bool) $settings->getValue('notifications', 'broadcast_enabled', false);

        if ($emailEnabled) {
            $channels[] = 'mail';
        }

        if ($broadcastEnabled) {
            $channels[] = 'broadcast';
        }

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->title)
            ->line($this->message)
            ->line('Order ID: '.(string) ($this->context['order_id'] ?? ''))
            ->line('Status: '.(string) ($this->context['status'] ?? ''));
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->payload());
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->payload();
    }

    /**
     * @return array<string, mixed>
     */
    protected function payload(): array
    {
        return [
            'event' => $this->event,
            'title' => $this->title,
            'message' => $this->message,
            'context' => $this->context,
        ];
    }
}
