import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fuse-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss']
})
export class AuthorisationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Router', this.router.config);
    /* console.log('AA', this.router.config[2]._loadedConfig.routes);
    console.log('Routes', this.getPages()); */
  }

  /* getPages() {
    const routesInformation = this.router.config;
    let routes: Array<string>;
    routesInformation.forEach(route => {
      routes.push(route.path);
      if (route._loadedConfig.routes.length > 0) {
        console.log('IDK', route._loadedConfig.routes);
        route._loadedConfig.forEach(childRoute => {
          routes.push(route + '/' + childRoute.path);
        });
      }
    });
    return routes;
  } */
}
