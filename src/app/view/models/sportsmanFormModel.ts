import { FormControl, FormGroup, Validators } from '@angular/forms';
import { regExps } from '../../utils/Validators';

export class sportsmanFormModel {
  formsportsman(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      typeIdentification: new FormControl(null, [Validators.required]),
      birtDate: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      city: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      department: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      weight: new FormControl(null, [
        Validators.required,
        Validators.pattern(regExps['decimalNumbers']),
      ]),
      height: new FormControl(null, [
        Validators.required,
        Validators.pattern(regExps['decimalNumbers']),
      ]),
      gender: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      studyLevelMax: new FormControl(null, [Validators.required]),
      institutionNameStudy: new FormControl(null, [Validators.required]),
      DiciplinaID: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(regExps['emailComplet']),
      ]),
      phone: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    });
  }
}
