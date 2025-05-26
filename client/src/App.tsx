import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ThingsToDoPage from "@/pages/things-to-do";
import DestinationsPage from "@/pages/destinations";
import EventsPage from "@/pages/events";
import BlogPage from "@/pages/blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/things-to-do" component={ThingsToDoPage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/blog" component={BlogPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
