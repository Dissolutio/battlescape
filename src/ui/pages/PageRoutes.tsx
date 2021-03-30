import { Switch, Route } from "react-router-dom"

import { FeedbackPage } from "./FeedbackPage"
import { RulesPage } from "./RulesPage"
import { HelpPage } from "./HelpPage"
import { PageLayout } from "./PageLayout"

export const PageRoutes = () => {
  return (
    <Switch>
      <Route exact path="/help">
        <PageLayout>
          <HelpPage />
        </PageLayout>
      </Route>
      <Route exact path="/feedback">
        <PageLayout>
          <FeedbackPage />
        </PageLayout>
      </Route>
      <Route exact path="/rules">
        <PageLayout>
          <RulesPage />
        </PageLayout>
      </Route>
    </Switch>
  )
}
