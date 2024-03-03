import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable')
    }, 2000)
  })

  myLocalTime: Date = new Date();
  amountOfMoney: number = 12345.65;
  percentValue: number = 0.75;
  decimalValue: number = 1234.4567;

  serversForm!: FormGroup;

  addServer: boolean = false;

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];

  filteredStatus = '';
  statusValue = '';
  placeholder = `filter Servers by the`;
  changeTheStatusValue() {
    this.placeholder = `filter Servers by the ${this.statusValue}`
  }

  ngOnInit() {
    this.serversForm = new FormGroup({
      serverName: new FormControl(null, Validators.required),
      serverInstanceType: new FormControl(null, Validators.required),
      serverStatus: new FormControl(null, Validators.required),
      serverStarted: new FormControl(null, Validators.required)
    });

    this.retrieveServersFromLocalStorage();
  }

  retrieveServersFromLocalStorage() {
    const storedServers = localStorage.getItem('servers');
    if (storedServers) {
      this.servers = JSON.parse(storedServers);
    }
  }

  saveServersToLocalStorage() {
    localStorage.setItem('servers', JSON.stringify(this.servers));
  }

  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddingAServer() {
    this.addServer = true;
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(16, 1, 2017)
    });
    this.saveServersToLocalStorage();
  }

  userData: {name: string, age: number, city: string} = {
    name: 'Ibrahim',
    age: 21,
    city: 'Cairo-Egypt'
  };

  onSubmit() {
    this.addServer = !this.addServer;
    this.servers.push(
      {
        instanceType: this.serversForm.value['serverInstanceType'],
        name: this.serversForm.value['serverName'],
        status: this.serversForm.value['serverStatus'],
        started: this.serversForm.value['serverStarted'],
      }
    );
    this.saveServersToLocalStorage();
  }

  onCancel() {
    this.serversForm.reset();
    this.addServer = !this.addServer;
  }

  onRemoveServer(index: number) {
    this.servers.splice(index, 1);
    this.saveServersToLocalStorage()
  }
}
