import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(DOCUMENT).defaultView?.localStorage;
  if (localStorage && localStorage.getItem('token')!=='undefined' && localStorage.getItem('token')!== '') {
    console.log('User is authenticated');
    return true;
  } else {    
    //window.alert('Vous devez vous connecter pour accéder à cette page.');
    return inject(Router).navigate(['login']);
  }
};
