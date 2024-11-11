import { Component, OnInit } from '@angular/core';//Decoradores y ciclo de vida de componentes de Angular.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//Herramientas para la creación y validación de formularios en Angular.
import { Router } from '@angular/router';//Permite la navegación entre páginas en la aplicación.
import { AlertController, LoadingController } from '@ionic/angular';//Controladores de Ionic para mostrar alertas y animaciones de carga.
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	//credentials viene de html del formGroup
	credentials !: FormGroup;
	//!: operador definitivo, indica que aunque la variable credentials no este inicializada inmediatamete, sera asignada antes de ser utilizada.
	//FormGroup: es una clase de angular usada para manejar y organizar controles de formulario
	constructor(
		private fb: FormBuilder, 
		//facilita la creación y configuración de formularios de forma más legible
		private loadingController: LoadingController,
		//controla la visualización de elementos de carga
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {}

	// metodos de formgroup
	get email() {
		return this.credentials.get('email')!;
		//formControlName="email": Este atributo conecta el campo de entrada en el HTML con el control email definido en el FormGroup (credentials) en el archivo TypeScript.

		//! (operador de aserción no nulo): el ! es el operador de aserción no nulo en TypeScript. Le dice al compilador que get('email') no devolverá null ni undefined, por lo que es seguro asumir que este control existe.
	}

	get password() {
		return this.credentials.get('password')!;
	}

	ngOnInit() {
		//group: ofrece una forma conveniente de crear un grupo de controles de formulario mediante el método .group().
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			//'': Este es el valor inicial del campo email, que aquí está vacío (es una cadena vacía). Cuando el formulario se carga, el campo email está en blanco.
			//Validators.required: Indica que el campo email es obligatorio.
			// Validators.email: Indica que el campo email debe tener un formato válido de dirección de correo electrónico (como example@domain.com).
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {
		const loading = await this.loadingController.create();
		await loading.present();
		//loading.present() para mostrar el mensaje de carga en la pantalla.
		const user = await this.authService.register(this.credentials.value);
		await loading.dismiss();
		//loading.dismiss() hace que el mensaje de carga desaparezca, y await asegura que el código espere a que el mensaje de carga se haya cerrado completamente antes de continuar.
		
		if (user) {
			//Si user es verdadero, el usuario será redirigido a la página /home
			//this.router.navigateByUrl lleva al usuario a la página de inicio (/home) y reemplaza la URL actual para que no puedan volver al formulario de inicio de sesión usando el botón de retroceso.
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header:string, message:string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}
}