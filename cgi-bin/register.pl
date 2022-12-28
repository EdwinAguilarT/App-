#!/usr/bin/perl
use strict;
use warnings;
use DBI;
use CGI;

my $q = CGI -> new;
print $q->header('text/xml;charset=UTF-8');

my $user = $q->param('user');
my $password = $q->param('password');

if(defined($user) and defined($password)){
  Register($user,$password);
  successRegister();
}else{
  ShowRegister();
}

sub Register{
  my $userQuery = $_[0];
  my $passwordQuery = $_[1];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "INSERT INTO UserS VALUES (?,?)";
  my $sth = $dbh->prepare($sql);
  $sth->execute($userQuery, $passwordQuery);
  $sth->finish;
  $dbh->disconnect;
}

sub ShowRegister{
print <<XML;
<user>
</user>
XML
}

sub successRegister{
print <<XML;
<user>
  <admin>$user</admin>
</user>
XML
}

