import { useEffect, useState } from "react";
import { View } from "../widgets/view";

export function useView(name: string): View | undefined {
    const [view, setView] = useState<View | undefined>(View.findViewByName(name));

    useEffect(() => {
        // Check initially in case it was registered before effect ran
        const currentView = View.findViewByName(name);
        if (currentView !== view) {
            setView(currentView);
        }

        const unsubscribe = View.subscribe(() => {
            const newView = View.findViewByName(name);
            setView(newView);
        });

        return () => {
            unsubscribe();
        };
    }, [name, view]);

    return view;
}
