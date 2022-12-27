#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my @row;
my $dni = $q->param('dni');

if(defined($dni)){
  if(checkDNI($dni)){
    deleteClient($dni);
    showTag($dni)
  }else{
    showTag();
  }
}else{
  showTag();
}

sub deleteClient{
  my $dniQuery = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=192.168.0.11';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "DELETE FROM Clients WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($dniQuery);
  $sth->finish;
  $dbh->disconnect;
}

sub checkDNI{
  my $dniQuery = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=192.168.0.11';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT * FROM Clients  WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($dniQuery);
  my @row = ($sth->fetchrow_array);
  $sth->finish;
  $dbh->disconnect;
  return @row;
}

sub showTag{
  my $dniQuery = $_[0];
  if(defined($dniQuery)){
  print <<XML;
  <Client>
    <dni>$dni</dni>
  </Client>
XML
  }else{
  print<<XML;
  <Client>
  </Client>
XML
  }
}


