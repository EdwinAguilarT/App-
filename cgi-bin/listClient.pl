#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my @firstName;
my @lastName;
my @dni;
my @country;
my @isHere;

my $q = CGI -> new;
print $q->header('text/xml;charset=UTF-8');

CheckClient();
print <<XML;
<clients>
XML
foreach my $number (0..$#firstName){
  print <<XML;
  <client>
    <firstName>$firstName[$number]</firstName>
    <lastName>$lastName[$number]</lastName>
    <dni>$dni[$number]</dni>
    <country>$country[$number]</country>
    <isHere>$isHere[$number]</isHere>
  </client>
XML
}
print <<XML;
</clients>
XML

sub CheckClient {
  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT firstName FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute(); 
  my $i = 0;
  while (my @row = $sth->fetchrow_array){
   $firstName[$i]=$row[0];
   $i++;
  }
  
  $sql = "SELECT lastName FROM Clients";
  $sth = $dbh->prepare($sql);
  $sth->execute();
  $i = 0;
  while (my @row = $sth->fetchrow_array){
   $lastName[$i]=$row[0];
   $i++;
  }

  $sql = "SELECT dni FROM Clients";
  $sth = $dbh->prepare($sql);
  $sth->execute();
  $i = 0;
  while (my @row = $sth->fetchrow_array){
   $dni[$i]=$row[0];
   $i++;
  }

  $sql = "SELECT country FROM Clients";
  $sth = $dbh->prepare($sql);
  $sth->execute();
  $i = 0;
  while (my @row = $sth->fetchrow_array){
   $country[$i]=$row[0];
   $i++;
  }
  $sql = "SELECT isHere FROM Clients";
  $sth = $dbh->prepare($sql);
  $sth->execute();
  $i = 0;
  while (my @row = $sth->fetchrow_array){
   $isHere[$i]=$row[0];
   $i++;
  }
}
