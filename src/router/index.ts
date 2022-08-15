import { RCRouter } from 'src/lib';
import { LanguageValidator, UserDetailsValidator } from 'src/models';

export const router = new RCRouter([
  {
    path: ':language',
    component: 'application',
    model: LanguageValidator,
    routes: [
      {
        path: 'users',
        model: LanguageValidator,
        component: 'users',
        name: 'USERS',
        title: '用户列表',
        routes: [
          {
            path: ':id.html',
            model: UserDetailsValidator,
            component: 'details',
            name: 'USER_DETAIL',
            title: '用户详情',
          },
        ],
      },
      {
        path: 'sign-in.html',
        component: 'sign-in',
        name: 'USER_SIGN_IN',
        title: '登录',
      },
      {
        path: '404.html',
        component: 'not-found',
      },
      {
        path: '*',
        redirect: '404.html',
      },
    ],
  },
  {
    path: '*',
    redirect: 'zh_CN',
  },
]);
