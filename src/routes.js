import React, {
  Suspense,
  Fragment,
  lazy,
} from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={[i]}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    path: '/app',
    routes: [
      {
        exact: true,
        path: '/app/country',
        component: lazy(() => import('views/countryView/CountryViewList')),
      },
      {
        exact: true,
        path: '/app/country-detail/:pais',
        component: lazy(() => import('views/countryView/CountryDetail')),
      },
      {
        component: () => <Redirect to="/app/country" />,
      },
    ],
  },
  {
    path: '*',
    routes: [
      {
        component: () => <Redirect to="/app/country" />,
      },
    ],
  },
];

export default routes;
