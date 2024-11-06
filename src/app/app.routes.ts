import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { CreatelistComponent } from './createlist/createlist.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'editProfile', component: EditProfileComponent },
          { path: 'deleteProfile', component: DeleteProfileComponent },
        ],
      },
      { path: 'newlist', component: CreatelistComponent },
      { path: 'myLists', component: MyListsComponent },
      { path: 'editList', component: CreatelistComponent },
    ],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
