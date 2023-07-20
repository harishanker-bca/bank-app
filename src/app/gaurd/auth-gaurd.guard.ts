import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { ToasterService } from '../services/toaster.service';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const toast = inject(ToasterService)
  const router = inject(Router)
  if (auth.isLoggedIn()) {
    return true;
  }
  else {
    console.log("inside auth G");
    toast.showWarning("please login", "warning")
    router.navigateByUrl("")
    return false;
  }
};
