import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Router } from '@angular/router';

@Component({
  selector: 'fuse-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class FuseSampleComponent {
  constructor(
    private fuseTranslationLoader: FuseTranslationLoaderService,
    private router: Router
  ) {
    console.log('SAMPLE ROUTER', this.router.config);
    this.fuseTranslationLoader.loadTranslations(english, turkish);
  }
}
