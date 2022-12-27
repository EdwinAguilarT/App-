#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my @row;
my $first = $q->param('firstName');
my $last = $q->param('lastName');
my $dni = $q->param('dni');
my $country = $q->param('country');

if(defined($first) and defined($last) and defined($dni) and defined($country)){
  if(checkDNI($dni)){
    updateComponents($dni, $first, $last, $country);
    checkDNI($dni);
    showTag(@row);
  }else{
    showTag();
  }
}else{
  showTag();
}

sub checkDNI{
  my $dniQuery = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=192.168.0.11';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT * FROM Clients WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($dniQuery);
  @row = ($sth->fetchrow_array);
  $sth->finish;
  $dbh->disconnect;
  return @row;
}

sub updateComponents{
  my $dniQuery = $_[0];
  my $firstQuery = $_[1];
  my $lastQuery = $_[2];
  my $countryQuery = $_[3];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=192.168.0.11';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "UPDATE Clients SET firstName=? AND lastName=? AND country=? WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($firstQuery, $lastQuery, $countryQuery, $dniQuery);
  $sth->finish;
  $dbh->disconnect;
}

sub showTag{
  my @rowQuery = @_;
  if(@rowQuery){
    print<<XML;
    <CLient>
      <dni>$rowQuery[0]</dni>
      <firstName>$rowQuery[1]</firstName>
      <lastName>$rowQuery[2]</text>i
      <country>$rowQuery[3]</country>
    </client>
XML
  }else{
    print<<XML;
    <Client>
    </Client>
XML
  }
}
