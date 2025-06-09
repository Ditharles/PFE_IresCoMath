import { useTheme } from "../../../components/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

type Theme = "light" | "dark" | "system";

const PreferencesSection = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Thème</CardTitle>
                    <CardDescription>
                        Choisissez le thème de l'interface
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={theme}
                        onValueChange={(value: Theme) => setTheme(value)}
                        className="grid grid-cols-3 gap-4"
                    >
                        <div>
                            <RadioGroupItem
                                value="light"
                                id="light"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="light"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Sun className="mb-3 h-6 w-6" />
                                <span>Clair</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="dark"
                                id="dark"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="dark"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Moon className="mb-3 h-6 w-6" />
                                <span>Sombre</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="system"
                                id="system"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="system"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Monitor className="mb-3 h-6 w-6" />
                                <span>Système</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    );
};

export default PreferencesSection;
