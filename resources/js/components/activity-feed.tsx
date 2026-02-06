import { Activity } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ActivityFeed({ activities }: { activities: Activity[] }) {
    return (
        <div className="space-y-4">
            <h3 className="font-medium text-sm text-foreground">Activity History</h3>
            <div className="space-y-6 relative ml-3 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border">
                {activities.map((activity) => (
                    <div key={activity.id} className="relative pl-6 text-sm">
                        <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full ring-4 ring-background bg-muted-foreground/30" />
                        <div className="flex flex-col gap-1">
                            <span className="text-foreground font-medium">
                                {activity.user.name}
                                <span className="font-normal text-muted-foreground"> {activity.description.replace(/_/g, ' ')}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(activity.created_at).toLocaleString()}
                            </span>
                            {activity.changes && activity.changes.after && (
                                <div className="mt-1 text-xs bg-muted/40 p-2 rounded relative">
                                    {Object.keys(activity.changes.after).map((key) => (
                                        <div key={key}>
                                            <span className="font-semibold">{key}: </span>
                                            <span className="text-muted-foreground line-through mr-2">
                                                {String(activity.changes.before?.[key] ?? '')}
                                            </span>
                                            <span>
                                                {String(activity.changes.after[key])}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="text-sm text-muted-foreground pl-6">No activity recorded yet.</div>
                )}
            </div>
        </div>
    );
}
